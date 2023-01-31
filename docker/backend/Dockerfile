FROM ruby:3.0.4

RUN apt-get update -qq && apt-get install -y build-essential libpq-dev nodejs

ENV APP_PATH /var/www/backend

WORKDIR $APP_PATH

COPY ./backend/Gemfile $APP_PATH/Gemfile
COPY ./backend/Gemfile.lock $APP_PATH/Gemfile.lock
RUN bundle install

COPY ./backend $APP_PATH

RUN mkdir -p tmp/sockets && \
    mkdir -p /tmp/public && \
    cp -rf $APP_PATH/public/* /tmp/public

# COPY ./docker/backend/entrypoint.sh $APP_PATH
# RUN chmod +x /var/www/backend/bin/entrypoint.sh
# ENTRYPOINT ["entrypoint.sh"]

# CMD ["rails", "server", "-b", "0.0.0.0"]
