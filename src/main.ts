import { NestFactory } from '@nestjs/core'
import { ConsoleLogger, Logger } from '@nestjs/common'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import * as swaggerStats from 'swagger-stats'
import { AppModule } from './app.module'
import { NestExpressApplication } from '@nestjs/platform-express'

const bootstrap = async () => {
  try {
    const RUN_HOST = process.env.RUN_HOST || '127.0.0.1'
    const PORT = process.env.PORT || 5000

    const app = await NestFactory.create<NestExpressApplication>(AppModule, {
      logger: new ConsoleLogger(),
      cors: {
        origin: true,
        methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
        credentials: true,
        maxAge: 3600
      }
    })
    app.setGlobalPrefix('api')
    const config = new DocumentBuilder()
      .setTitle('Users')
      .setDescription('Документация REST API')
      .setVersion('1.0.0')
      .build()

    const document = SwaggerModule.createDocument(app, config)

    app.use(swaggerStats.getMiddleware({ swaggerSpec: document }))

    SwaggerModule.setup('/api/docs', app, document)

    await app.listen(PORT, () => {
      Logger.log(`http://${RUN_HOST}:${PORT} - server start`)
      Logger.log(`http://${RUN_HOST}:${PORT}/api/docs - swagger start`)
    })
  } catch (e) {
    console.log(e)
  }
}

bootstrap()
