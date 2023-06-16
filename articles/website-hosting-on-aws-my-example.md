---
title: Website hosting with AWS: My Example
date: June 9, 2023
author: Dorian Bonnet
abstract: Learn how to host a website using Amazon Web Services (AWS) by setting up an S3 bucket and an EC2 instance.
---

In this article, we will walk through the process of hosting a website using Amazon Web Services (AWS). We will start by setting up an S3 bucket to store our website files and then proceed to configure an EC2 instance to serve the website to the world.

&NewLine;

### Step 1: Setting up an S3 Bucket

1. Log in to the AWS Management Console and navigate to the S3 service.
2. Click on "Create bucket" to start creating a new bucket.
3. Provide a unique name for your bucket, such as "my-website-bucket".
4. Choose the region where you want to host your bucket.
5. Configure the bucket permissions and policies according to your requirements.
6. Upload your website files to the bucket, including HTML, CSS, JavaScript, and any other assets.
7. Enable static website hosting for the bucket and specify the default index document.
8. Note down the bucket's endpoint URL, as we will need it in the next step.

&NewLine;

### Step 2: Configuring an EC2 Instance

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

&NewLine;

### Step 3: Testing and Finalizing

1. Ensure that the EC2 instance is running and the web server is properly configured.
2. Open a web browser and enter the public IP address or domain name associated with the EC2 instance.
3. If everything is set up correctly, your website should be accessible and functional.
4. Test different pages, links, and functionalities to verify the hosting setup.
5. Make any necessary adjustments or optimizations to enhance the performance and security of your website.
6. Set up a custom domain name and configure DNS settings to point to the EC2 instance's public IP or associated Elastic IP (EIP).
7. Continuously monitor and manage your website hosting infrastructure to ensure its availability and scalability.

&NewLine;
Congratulations! You have successfully hosted your website using AWS S3 and EC2. This example provides a basic setup, and you can further explore additional AWS services to enhance your website's capabilities, such as using Amazon CloudFront for content delivery, setting up SSL/TLS certificates with AWS Certificate Manager, or using AWS Elastic Load Balancer for load balancing.

I hope this article has provided you with a clear understanding of the process involved in hosting a website with AWS. Happy hosting!
