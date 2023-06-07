import {aws_ecr, aws_s3, Duration, Stack, StackProps} from 'aws-cdk-lib';
import * as sns from 'aws-cdk-lib/aws-sns';
import * as subs from 'aws-cdk-lib/aws-sns-subscriptions';
import * as sqs from 'aws-cdk-lib/aws-sqs';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as ecs from 'aws-cdk-lib/aws-ecs';
import * as ecs_patterns from 'aws-cdk-lib/aws-ecs-patterns';
import { Construct } from 'constructs';
import {EcrImage} from "aws-cdk-lib/aws-ecs";
import {Repository} from "aws-cdk-lib/aws-ecr";

export interface ServiceStackProps extends StackProps {
    imageTag: string
}

export class AwsAppCdkStack extends Stack {
  constructor(scope: Construct, id: string, props?: ServiceStackProps) {
    super(scope, id, props);

   const bucket = new aws_s3.Bucket(this,"test-cdk",{
     bucketName: "hema2023051623",
     versioned: false,
     blockPublicAccess: aws_s3.BlockPublicAccess.BLOCK_ALL
   });

   const vpc = new ec2.Vpc(this, "MyVpc",{
       maxAzs: 3
   });

   const cluster = new ecs.Cluster(this, "MyCluster",{
       vpc: vpc
   });

      const ecrRepo = Repository.fromRepositoryArn(
          this,
          'ecr-repo',
          `arn:aws:ecr:us-west-2:294541522848:repository/reactive-music`)

      const fargateAlbService = new ecs_patterns.ApplicationLoadBalancedFargateService(this, "MyFargateService",{
       cluster: cluster,
       cpu: 256,
       desiredCount: 1,
       memoryLimitMiB: 512,
       publicLoadBalancer: true,
       taskImageOptions: { image: EcrImage.fromEcrRepository(ecrRepo,props?.imageTag)},
   })

   fargateAlbService.targetGroup.configureHealthCheck({path:'/actuator/health', timeout: Duration.seconds(30), interval: Duration.seconds(60)})
  }
}
