# Angular + Phoenix

A Phoenix framework app with Angular 18 and TypeScript as its frontend.

## Phoenix Backend

To start your Phoenix server:

* Go to the api folder
* Install dependencies with `mix deps.get`
* Create and migrate your database with `mix ecto.setup`
* Start the Phoenix endpoint with `mix phx.server` or inside IEx with `iex -S mix phx.server`

Now you can visit [`localhost:4000`](http://localhost:4000) from your browser.

### Seeding the Database

To populate the database with initial data, run:

```
mix run priv/repo/seeds.exs
```

## Angular Frontend

For developing the frontend:

* Navigate to the client directory
* Install all dependencies with `npm install`
* Start the dev server with `ng serve`

Now you can visit [`localhost:4002`](http://localhost:4002) from your browser to see the grid of products.

## Development

* Phoenix backend runs on `localhost:4000`
* Angular frontend runs on `localhost:4002`

## Learn More

### Phoenix
* Official website: https://www.phoenixframework.org/
* Guides: https://hexdocs.pm/phoenix/overview.html
* Docs: https://hexdocs.pm/phoenix
* Forum: https://elixirforum.com/c/phoenix-forum
* Source: https://github.com/phoenixframework/phoenix

### Angular
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.2.4.

#### Development server
Run `ng serve` for a dev server. Navigate to `http://localhost:4002/`. The application will automatically reload if you change any of the source files.

#### Code scaffolding
Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

#### Build
Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

#### Running unit tests
Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

#### Running end-to-end tests
Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

#### Further help
To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

## Deployment

Ready to run in production? Please [check our deployment guides](https://hexdocs.pm/phoenix/deployment.html) for Phoenix applications.