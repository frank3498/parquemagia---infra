resource "aws_s3_bucket" "assets" {
  bucket = "parquemagia-assets-${random_id.suffix.hex}"

  tags = {
    Name = "parquemagia-assets"
  }
}

resource "aws_s3_bucket_public_access_block" "assets_pub" {
  bucket = aws_s3_bucket.assets.id

  block_public_acls       = false
  block_public_policy     = false
  ignore_public_acls      = false
  restrict_public_buckets = false
}

resource "aws_s3_bucket_ownership_controls" "assets_own" {
  bucket = aws_s3_bucket.assets.id

  rule {
    object_ownership = "BucketOwnerPreferred"
  }
}

resource "aws_s3_bucket_acl" "assets_acl" {
  bucket = aws_s3_bucket.assets.id
  acl    = "public-read"

  depends_on = [aws_s3_bucket_ownership_controls.assets_own]
}

resource "aws_s3_bucket_website_configuration" "assets_site" {
  bucket = aws_s3_bucket.assets.id

  index_document {
    suffix = "index.html"
  }
}
