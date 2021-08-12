const cdk = require('@aws-cdk/core');

class InfrastructureStack extends cdk.Stack {

  constructor(scope, id, repoName, props) {
    super(scope, id, props);

    // The code that defines your stack goes here
  }
}

module.exports = { InfrastructureStack }
