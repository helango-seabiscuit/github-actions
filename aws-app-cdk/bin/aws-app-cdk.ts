#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { AwsAppCdkStack } from '../lib/aws-app-cdk-stack';
import {IMAGE_TAG} from "../config/environment";

const app = new cdk.App();
new AwsAppCdkStack(app, 'AwsAppCdkStack', {
    imageTag: IMAGE_TAG!
});
