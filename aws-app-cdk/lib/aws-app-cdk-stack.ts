import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as ecs from 'aws-cdk-lib/aws-ecs';
import * as ecs_patterns from 'aws-cdk-lib/aws-ecs-patterns';
import { Construct } from 'constructs';
import {EcrImage} from "aws-cdk-lib/aws-ecs";
import {Repository} from "aws-cdk-lib/aws-ecr";
import {aws_s3, aws_s3_deployment, CfnOutput, Duration, Stack, StackProps} from "aws-cdk-lib";
import {BlockPublicAccess} from "aws-cdk-lib/aws-s3";
import * as path from "path";

export interface ServiceStackProps extends StackProps {
    imageTag: string
}

export class AwsAppCdkStack extends Stack {
  constructor(scope: Construct, id: string, props?: ServiceStackProps) {
    super(scope, id, props);


    const bucket = new aws_s3.Bucket(this, "s3BucketTest",{
        bucketName: "helango-udemy-cdk-test",
        blockPublicAccess: BlockPublicAccess.BLOCK_ALL,
        }
    )
      const deployBucket = new aws_s3_deployment.BucketDeployment(this, "deployBucket",{
          sources: [aws_s3_deployment.Source.asset(path.join(__dirname, '../s3uploads'))],
          destinationBucket: bucket
          }

      )
  //  const vpc = new ec2.Vpc(this, "MyVpc",{
  //     maxAzs: 3
  //  });
  //
  //  const cluster = new ecs.Cluster(this, "MyCluster",{
  //       vpc: vpc
  //  });
  //
  //     const ecrRepo = Repository.fromRepositoryArn(
  //         this,
  //         'ecr-repo',
  //         `arn:aws:ecr:us-west-2:294541522848:repository/reactive-music`)
  //
  //     const fargateAlbService = new ecs_patterns.ApplicationLoadBalancedFargateService(this, "MyFargateService",{
  //      cluster: cluster,
  //      cpu: 256,
  //      healthCheckGracePeriod: Duration.seconds(120),
  //      desiredCount: 2,
  //      memoryLimitMiB: 512,
  //      publicLoadBalancer: true,
  //      taskImageOptions: { image: EcrImage.fromEcrRepository(ecrRepo,props?.imageTag)},
  //  })
  //
  //  fargateAlbService.targetGroup.configureHealthCheck({path:'/actuator/health', timeout: Duration.seconds(30), interval: Duration.seconds(60)})
  //     new CfnOutput(this, "loadBalancer" , {
  //         exportName: "lburl",
  //         value: fargateAlbService.loadBalancer.loadBalancerDnsName
  //     })
   }
}
