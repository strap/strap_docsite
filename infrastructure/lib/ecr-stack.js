const cdk = require('@aws-cdk/core');
const ecr = require('@aws-cdk/aws-ecr');


class EcrStack extends cdk.Stack {

    constructor(scope, id, props) {
        super(scope, id, props);

        this.repoName = `${id}-ecr`;
        new ecr.Repository(this, this.repoName, { repositoryName: this.repoName, lifecycleRules: [{ maxImageCount: 2 }] });
    }
}

module.exports = { EcrStack }
