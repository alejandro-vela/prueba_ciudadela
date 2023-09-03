import { createServer, Server as HTTPServer } from "http";
import express, { Application, Request, Response, NextFunction } from "express";



// Middlewares
import { ErrorMiddleware } from "./middleware/errorHandler";
import { NotFoundMiddleware } from "./middleware/notFoundHandler";

// Rutas
import charactersRoutes from "./routes/characters";


export class Server {

  private app: Application = express();
  private httpServer: HTTPServer = createServer(this.app);

  private initialize(): void {

    // Inicia la configuración de la app
    this.initApp();
    this.configureRoutes();
    // Inicia los middelwares
    this.mountMiddlewares();
  }

  /**
   * Inicia la aplicación
   */
  private initApp(): void {

    this.app.disable("x-powered-by");
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));

    // Establece las respuestas del header
    this.app.use((req: Request, res: Response, next: NextFunction) => {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS");
      res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
      next();
    });
  }

  /**
   * Establece las rutas
   */
  private mountMiddlewares(): void {

    const errorMid = new ErrorMiddleware();
    const notFound = new NotFoundMiddleware();
    // 404
    this.app.use(notFound.notFountHandler);
    // Logger to request
    this.app.use(errorMid.loggerMiddleware);
    // Manejo de errores
    this.app.use(errorMid.logErrors);
    this.app.use(errorMid.wrapErrors);
    this.app.use(errorMid.errorHandler);
  }

  /**
   * Inicia las rutas
   */
  private configureRoutes(): void {
    this.app.use('/graphql', charactersRoutes);
  }

  /**
   * Inicia el listener del server
   * @param callback 
   */
  public listen(callback: (port: number) => void): void {
    const port = parseInt(process.env.PORT as string);
    this.httpServer.listen(port, () => {
      callback(port);
      this.initialize();
    });
  }

  public close() {
    this.httpServer.close();
  }
}