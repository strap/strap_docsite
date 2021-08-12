#!/usr/bin/env node

const cdk = require('@aws-cdk/core');
const { EcrStack } = require('../lib/ecr-stack');
const { InfrastructureStack } = require('../lib/infrastructure-stack');


const app = new cdk.App();
const ecr = new EcrStack(app, 'engage-docs-repo', { env: { account: '021126141799', region: 'us-west-2' } });
new InfrastructureStack(app, 'engage-docs', ecr.repoName, { env: { account: '021126141799', region: 'us-west-2' } });