defmodule AngularphoenixWeb.ProductController do
  use AngularphoenixWeb, :controller

  alias Angularphoenix.Catalog
  alias Angularphoenix.Catalog.Product

  action_fallback AngularphoenixWeb.FallbackController

  def index(conn, _params) do
    products = Catalog.list_products()
    render(conn, :index, products: products)
  end

  def create(conn, product_params) do
    case  Catalog.create_product(product_params) do
      {:ok, _product} ->
        json(conn, %{"status" => "Created"})

      {:error, changeset} ->
        conn
        |> put_status(:bad_request)
        |> json(%{errors: changeset})
    end
  end

  def show(conn, %{"id" => id}) do
    product = Catalog.get_product!(id)
    render(conn, :show, product: product)
  end

  def update(conn, product_params) do
    id = String.to_integer(product_params["id"])
    # Assuming you have a Product schema and Repo available
    case Catalog.get_product!(id) do
      nil ->
        send_resp(conn, 404, "Product not found")

      product ->
        case Catalog.update_product(product, product_params) do
          {:ok, _product} ->
            json(conn, %{"status" => "updated"})

          {:error, changeset} ->
            conn
            |> put_status(:bad_request)
            |> json(%{errors: changeset})
        end
    end
  end

  def delete(conn, %{"id" => id}) do
    product = Catalog.get_product!(id)

    with {:ok, %Product{}} <- Catalog.delete_product(product) do
      send_resp(conn, :no_content, "")
    end
  end
end
