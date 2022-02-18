# BOOK STORE
در این پروژه ما یک سایت کتاب فروشی طراحی کرده‌ایم.
قدم اول در طراحی این پروژه طراحی اجزای آن است که ما برای فرانت از اپلیکیشن react و برای بکند از parse server  استفاده کرده‌ایم.

![This is an image](./image/structure.png)

این ساختار کلی کد است که همانطور که دیده می‌شود از nginx به عنوان load balancer و reverse proxy اسفتاده کرده ایم.
همچنین در طراحی دیتابیس این پروژه از چند دیتابیس postgres که یک از آنها دیتابیس master است و در آن عمل خواندن و نوشتن صورت می‌پذیرد و دیگری مخصوص خواندن است.
این کار باعث ایجاد یک تقسیم بار می شود و می‌توان ریکوسیت ها را میان دیتابیس master و دیتابیس slave تقسیم کرد.
