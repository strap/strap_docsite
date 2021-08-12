const cdk = require('@aws-cdk/core');
const ecs = require('@aws-cdk/aws-ecs');
const ecr = require('@aws-cdk/aws-ecr');
const ec2 = require('@aws-cdk/aws-ec2');
const iam = require('@aws-cdk/aws-iam');
const log = require('@aws-cdk/aws-logs')
const lb = require('@aws-cdk/aws-elasticloadbalancingv2');


class InfrastructureStack extends cdk.Stack {

  constructor(scope, id, repoName, props) {
    super(scope, id, props);

    const loadBalancerArn = 'arn:aws:elasticloadbalancing:us-west-2:021126141799:loadbalancer/app/strap-wearable-stack-lb/756bdf60277df2ed';
    const vpc = ec2.Vpc.fromLookup(this, `${id}-vpc`, { vpcId: 'vpc-56f6552e' });
    const repository = ecr.Repository.fromRepositoryName(this, id, repoName);
    const image = ecs.ContainerImage.fromEcrRepository(repository);
    const subnet = ec2.Subnet.fromSubnetId(this, `${id}-subnet`, 'subnet-a2a29fdb');
    const securityGroup = ec2.SecurityGroup.fromLookup(this, `${id}-sec-group`, 'sg-17b7485c');
    const execRole = iam.Role.fromRoleArn(this, `${id}-role`, 'arn:aws:iam::021126141799:role/ecsTaskExecutionRole');
    const listener = lb.ApplicationListener.fromLookup(this, `${id}-listener`, { loadBalancerArn: loadBalancerArn, listenerPort: 443 });

    securityGroup.addIngressRule(ec2.Peer.ipv6('::/0'), ec2.Port.tcp(8124), 'engage_docs');
    securityGroup.addIngressRule(ec2.Peer.ipv4('0.0.0.0/0'), ec2.Port.tcp(8124), 'engage_docs');
    const targetGroup = new lb.ApplicationTargetGroup(this, `${id}-tg`, { vpc: vpc, port: 80, protocol: lb.Protocol.HTTP, targetType: lb.TargetType.IP, targetGroupName: `${id}-tg`, healthCheck: { interval: cdk.Duration.seconds(30), path: "/", timeout: cdk.Duration.seconds(5) } });

    new lb.ApplicationListenerRule(this, `${id}-rule`, {
      priority: 13,
      listener: listener,
      conditions: [lb.ListenerCondition.hostHeaders(['docs.curanexus.io'])],
      action: lb.ListenerAction.forward([targetGroup])
    });

    const cluster = ecs.Cluster.fromClusterAttributes(this, `${id}-cluster`, { clusterName: 'strap-engage-cluster', vpc: vpc, securityGroups: [securityGroup] });

    const ecsName = `${id}-ecs`;
    const portMap = { containerPort: 8124, hostPort: 8124, protocol: ecs.Protocol.TCP };
    const logGroup = new log.LogGroup(this, `${id}-log-group`, { logGroupName: "/strap/services/engage_docs", retention: log.RetentionDays.FIVE_DAYS, removalPolicy: cdk.RemovalPolicy.DESTROY });
    const logDriver = ecs.LogDriver.awsLogs({ streamPrefix: 'engage_docs', logGroup: logGroup });
    const taskDef = new ecs.TaskDefinition(this, `${id}-task-definition`, { cpu: "256", memoryMiB: "512", compatibility: ecs.Compatibility.EC2_AND_FARGATE, taskRole: execRole, executionRole: execRole });
    taskDef.addContainer(`${id}-container`, { containerName: `${id}-container`, memoryLimitMiB: 512, image: image, portMappings: [portMap], logging: logDriver });
    const service = new ecs.FargateService(this, ecsName, {
      cluster: cluster, serviceName: ecsName, assignPublicIp: true, desiredCount: 1, securityGroups: [securityGroup], taskDefinition: taskDef, vpcSubnets: { subnets: [subnet] }
    });
    service.attachToApplicationTargetGroup(targetGroup);
  }
}

module.exports = { InfrastructureStack }
