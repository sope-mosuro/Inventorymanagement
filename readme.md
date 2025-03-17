Inventory management application


to run create clone repo and create a applications.properties file and fill


spring.application.name=inventory-manager
spring.datasource.url=your-db-connectionstring
spring.datasource.username=db-username
spring.datasource.password=db-password
spring.datasource.driver-class-name=com.microsoft.sqlserver.jdbc.SQLServerDriver
logging.level.org.springframework.security=DEBUG

spring.jpa.hibernate.ddl-auto=update
spring.jpa.database-platform=org.hibernate.dialect.SQLServerDialect

jwt.secret=
jwt.expiration=
