class ItemsController < ApplicationController
  respond_to :json

  def index
    respond_with Item.all
  end

  def create
    Item.create(params[:item])
    head :ok
  end
end
