import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as ecs from 'aws-cdk-lib/aws-ecs';
import * as ecs_patterns from 'aws-cdk-lib/aws-ecs-patterns';
import { Construct } from 'constructs';
import {EcrImage} from "aws-cdk-lib/aws-ecs";
import {Repository} from "aws-cdk-lib/aws-ecr";
import {CfnOutput, Duration, Stack, StackProps} from "aws-cdk-lib";

export interface ServiceStackProps extends StackProps {
    imageTag: string
}

export class AwsAppCdkStack extends Stack {
  constructor(scope: Construct, id: string, props?: ServiceStackProps) {
    super(scope, id, props);


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
       healthCheckGracePeriod: Duration.seconds(120),
       desiredCount: 2,
       memoryLimitMiB: 512,
       publicLoadBalancer: true,
       taskImageOptions: { image: EcrImage.fromEcrRepository(ecrRepo,props?.imageTag)},
   })

     // const scalableTarget = fargateAlbService.service.autoScaleTaskCount({
     //      minCapacity:1,
     //      maxCapacity:4
     //  })
     //  scalableTarget.scaleOnCpuUtilization("",{
     //      targetUtilizationPercent: 50
     //  })
     //  scalableTarget.scaleOnMemoryUtilization("",{
     //      targetUtilizationPercent:50
     //  })

   fargateAlbService.targetGroup.configureHealthCheck({path:'/actuator/health', timeout: Duration.seconds(30), interval: Duration.seconds(60)})
      new CfnOutput(this, "loadBalancer" , {
          exportName: "lburl",
          value: fargateAlbService.loadBalancer.loadBalancerDnsName
      })
  }
}
