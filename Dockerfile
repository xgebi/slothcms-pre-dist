FROM php:apache

WORKDIR /etc/apache2
COPY slothcms.conf sites-available/slothcms.conf
COPY slothcms.conf sites-enabled/slothcms.conf
RUN rm sites-enabled/000-default.conf && service apache2 restart

WORKDIR /var/www
RUN mkdir slothcms && mkdir slothcms/slothcms

EXPOSE 80

CMD ["apache2-foreground"]