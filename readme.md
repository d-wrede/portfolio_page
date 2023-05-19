# Portfolio Website

This repository contains the codebase for a professional portfolio website. The website serves as a platform to showcase an individual's background, skills, projects, and to provide contact information in a user-friendly and engaging manner.

## Structure and Content

The portfolio website is divided into five distinct sections:

1. **Home**: The landing page offering a brief introduction and the main career highlights.
2. **About**: A comprehensive insight into the individual's background, skills, qualifications, and unique value proposition.
3. **Resume**: A detailed account of academic history, professional experience, certifications, and other relevant details.
4. **Projects**: Showcases the range of projects executed, demonstrating practical experience and expertise.
5. **Contact**: A section for visitors to get in touch using a form. Each form submission triggers an automated email through AWS Simple Email Service (SES).

In addition, the website integrates a chat interface powered by OpenAI's GPT-4 model. This chatbot uses the individual's professional information to provide comprehensive responses, enhancing the user experience by offering an engaging way to learn more about the individual's profile.

The website is designed to be responsive and user-friendly, ensuring a seamless experience across different devices and platforms. It follows a clean, modern design aesthetic.

## Privacy

The website is designed with user privacy in mind. No cookies are stored during the usage of the site, ensuring user data privacy and GDPR compliance.

## Technical Implementation

The frontend of the website is hosted on an Amazon S3 bucket, with a separate S3 bucket handling redirection for 'www' and non-'www' traffic. All buckets are private and are accessible only via origin access identity (for website files through CloudFront distributions) or IAM role (for the chat bucket used in chat conversations). The website utilizes AWS services for functionalities such as email forwarding and chatbot operation.

For a more detailed technical overview, refer to the [AWS Infrastructure repository](https://github.com/d-wrede/AWS_capstone_project.git).

## Source Files

The website files (HTML, CSS, JS, etc.) can be found in this repository: [Portfolio Page Repository](https://github.com/d-wrede/portfolio_page).
