provider "aws" {
  region = "ap-southeast-2"
}

resource "aws_instance" "myec2" {
  ami           = "ami-0d2fb06f3c1484132"
  instance_type = "t2.micro"

  tags = {
    Name = "Web Server"
  }
}