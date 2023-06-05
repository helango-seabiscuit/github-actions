import {aws_s3, Duration, Stack, StackProps} from 'aws-cdk-lib';
import * as sns from 'aws-cdk-lib/aws-sns';
import * as subs from 'aws-cdk-lib/aws-sns-subscriptions';
import * as sqs from 'aws-cdk-lib/aws-sqs';
import { Construct } from 'constructs';

export class AwsAppCdkStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    // const queue = new sqs.Queue(this, 'AwsAppCdkQueue', {
    //   visibilityTimeout: Duration.seconds(300)
    // });
    //
    // const topic = new sns.Topic(this, 'AwsAppCdkTopic');
    //
    // topic.addSubscription(new subs.SqsSubscription(queue));

   const bucket = new aws_s3.Bucket(this,"test-cdk",{
     bucketName: "hema2023051623",
     versioned: false,
     blockPublicAccess: aws_s3.BlockPublicAccess.BLOCK_ALL
   });
  }
}