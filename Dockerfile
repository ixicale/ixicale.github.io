# Use an official Ruby 3 runtime as a parent image
FROM ruby:3.0
# Install dependencies
RUN apt-get update -qq && apt-get install -y build-essential
# Set the working directory in the container
WORKDIR /usr/src/app
# Copy the current directory contents into the container at /usr/src/app
COPY . .
# Install Bundler
RUN gem install bundler
# Install Jekyll and webrick
# Replace '4.2.0' with the version you need, or remove the version specification to install the latest version
RUN gem install jekyll -v '4.2.0' 
RUN gem install webrick
RUN gem install sassc
# Make port 4000 available to the world outside this container
EXPOSE 4000
# Define environment variable
ENV JEKYLL_ENV=development
# Run jekyll serve when the container launches with live reload enabled
CMD ["jekyll", "serve", "--livereload", "--force_polling", "--host", "0.0.0.0"]
