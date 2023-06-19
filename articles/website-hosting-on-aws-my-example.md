---
title: Website hosting with AWS: My Example
date: June 9, 2023
author: Dorian Bonnet
abstract: Learn how to host a static website using Amazon Web Services (AWS) by setting up an S3 bucket that store your 
static contents and an EC2 instance that serve your website with all data you need.
keywords: AWS, React, JavaScript
topic: Web Development
---

In this article I put on paper my journey in the creation of this website on which you are currently. In this process I went through many stages, worked and learned many concepts in web development field. Thus, this article aims to inspire and help all those who want to travel this journey.

To get to the heart of the matter without further ado, we'll walk through everything you need to bring your website to life using AWS. Specifically, we will discuss the following:

1. Create S3 buckets to store your website files
2. Setup a DNS and its settings with Route 53
3. Caching and make a secure connection with Cloudfront
4. Automate the update of your S3 bucket with github action
5. Create an API on EC2 to serve your website
6. make a secure connection between your website and your API with a Certificate Authority

## Step 1: Setting up an S3 Bucket

Go to the AWS console and search for S3. We're going to actually create two different buckets for our website, one with the name of our website with "www" in front of it and one another without. The reason why we need both is because one of them is going to be the authority and going to have all of our content in it and the other is going to be for redirect. I personaly choose the "www" one to be the authority so when someone goes to the non-www one it's going to redirect to the other version. - Clic on create bucket, - Change "bucket name" to "www.<website_name>" - Choose a region close to you - Leave everything else as default - Clic on create bucket - Create a second bucket without www

Go to your authority bucket, the "www" one for me and upload your files. Leave everything as default and clic on uplaod. After you have uploaded your website files to the bucket, including HTML, CSS, JavaScript, and any other assets, we need to enable some public settings. By default, public access is blocked. Go back to your authority bucket and clic on permission and the first thing we need to do is desable "Bloc public access". Then we need to edit our bucket policy to allow anyone to call the S3 get object api on our bucket, so change it as follow:

```
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "PublicReadGetObject",
            "Effect": "Allow",
            "Principal": "*",
            "Action": [
                "s3:GetObject"
            ],
            "Resource": [
                "arn:aws:s3:::<www.website_name>/*"
            ]
        }
    ]
}
```

Make sure to replace <www.website_name> with the correct value and clic on save changes.

We need now to enable "website static hosting" on our authority bucket. So go to properties and scroll all the way down and there should be a section for it. Clic on edit. select "enable" and you'll see two option of hosting type. Since this is the bucket where we uploaded all the content it's going to be the host for the static website. Don't forget to specify the default index document and clic on save changes
Go back to buckets and clic on the non-www one. Scroll all the way down and edit "static website hosting". Enable it, select "Redirect requests for an object", the host name is going to be the name of our other bucket, "www.<website_name>" and select http as protocol. In a later steps when we'll use cloudfront we're going to come back here and set this to https so we can get security on our website. That is everyting that we need to do from S3 perpective for now

## Step 2: Configuring an EC2 Instance

1. Navigate to the EC2 service in the AWS Management Console.
2. Launch a new EC2 instance with the desired specifications (e.g., instance type, security groups, etc.).
3. Choose an appropriate Amazon Machine Image (AMI) for your instance. A popular choice is Amazon Linux 2.
4. Configure the instance details, such as the subnet, VPC, and storage options.
5. Configure the security groups to allow incoming traffic on port 80 for HTTP access.
6. Review the instance details and launch the EC2 instance.
7. Create or select an existing key pair for SSH access to the instance.
8. Once the instance is running, SSH into it using the key pair and instance's public IP address.
9. Install a web server of your choice (e.g., Nginx, Apache) and configure it to serve the website files.
10. Update the web server's configuration to use the S3 bucket's endpoint URL as the proxy or reverse proxy.

## Step 3: Testing and Finalizing

1. Ensure that the EC2 instance is running and the web server is properly configured.
2. Open a web browser and enter the public IP address or domain name associated with the EC2 instance.
3. If everything is set up correctly, your website should be accessible and functional.
4. Test different pages, links, and functionalities to verify the hosting setup.
5. Make any necessary adjustments or optimizations to enhance the performance and security of your website.
6. Set up a custom domain name and configure DNS settings to point to the EC2 instance's public IP or associated Elastic IP (EIP).
7. Continuously monitor and manage your website hosting infrastructure to ensure its availability and scalability.

Congratulations! You have successfully hosted your website using AWS S3 and EC2. This example provides a basic setup, and you can further explore additional AWS services to enhance your website's capabilities, such as using Amazon CloudFront for content delivery, setting up SSL/TLS certificates with AWS Certificate Manager, or using AWS Elastic Load Balancer for load balancing.

I hope this article has provided you with a clear understanding of the process involved in hosting a website with AWS. Happy hosting!
