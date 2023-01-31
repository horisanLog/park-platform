FROM nginx:latest

# RUN apk add --update bash curl apache2-utils openssl
# インクルード用のディレクトリ内を削除
RUN rm -f /etc/nginx/conf.d/*

# Nginxの設定ファイルをコンテナにコピー
COPY nginx.conf /etc/nginx/nginx.conf
# COPY containers/nginx/gen_htpasswd /etc/nginx
# RUN bash /etc/nginx/gen_htpasswd
# ビルド完了後にNginxを起動
CMD /usr/sbin/nginx -g 'daemon off;' -c /etc/nginx/nginx.conf
