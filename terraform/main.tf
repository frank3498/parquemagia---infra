terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
    random = {
      source  = "hashicorp/random"
      version = "~> 3.0"
    }
  }

  required_version = ">= 1.6.0"
}

provider "aws" {
  region = var.region
}

# ID aleatorio para el bucket
resource "random_id" "suffix" {
  byte_length = 2
}
