alias App.Catalog

quotes_path = "priv/repo/products.json"
quotes_path
|> File.read!()
|> Jason.decode!()
|> Enum.each(fn attrs ->

	product = %{
    id: attrs["id"],
    title: attrs["title"],
    description: attrs["description"],
    price: attrs["price"],
    views: attrs["views"]
  }
	case Catalog.create_product(product) do
		{:ok, _product} -> :ok
		{:error, _changeset} -> :duplicate
	end
end)
