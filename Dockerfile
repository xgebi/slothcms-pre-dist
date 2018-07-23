FROM php:apache

EXPOSE 80

WORKDIR /var/www
RUN mkdir slothcms

COPY dist/ slothcms/

CMD ["apache2-foreground"]