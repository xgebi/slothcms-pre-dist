FROM php:apache

WORKDIR /etc/apache2
COPY slothcms.conf sites-available/slothcms.conf
COPY slothcms.conf sites-enabled/slothcms.conf
RUN rm sites-enabled/000-default.conf && a2enmod rewrite

WORKDIR /var/www

COPY phpinfo.php html/index.php

RUN mkdir slothcms && mkdir slothcms/slothcms && service apache2 restart

EXPOSE 80

CMD ["apache2-foreground"]