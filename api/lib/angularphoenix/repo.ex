defmodule Angularphoenix.Repo do
  use Ecto.Repo,
    otp_app: :angularphoenix,
    adapter: Ecto.Adapters.Postgres
end
