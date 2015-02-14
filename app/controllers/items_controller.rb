class ItemsController < ApplicationController
  respond_to :json

  def index
    respond_with Item.unarchived
  end

  def create
    respond_with Item.create(item_params)
  end

  def update
    @item = Item.find(params[:item][:id])
    @item.update(item_params)

    respond_with @item
  end

  def archive
    @item = Item.find(params[:item][:id])
    @item.update(archived_at: DateTime.now)

    respond_with @item
  end

  def archive
    @item = Item.find(params[:item][:id])
    @item.update(archived_at: DateTime.now)

    respond_with @item
  end

  private

  def item_params
    params.require(:item).permit(:body, :complete)
  end
end
