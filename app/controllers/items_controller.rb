class ItemsController < ApplicationController
  def index
    render json: Item.unarchived
  end

  def create
    render json: Item.create(item_params)
  end

  def update
    @item = Item.find(params[:item][:id])
    @item.update(item_params)

    render json: @item
  end

  def archive
    @item = Item.find(params[:item][:id])
    @item.archive

    render json: @item
  end

  def unarchive
    @item = Item.find(params[:item][:id])
    @item.unarchive

    render json: @item
  end

  def archive_complete
    Item.archive_complete

    render json: Item.unarchived
  end

  def archive_all
    Item.archive_all

    render json: Item.unarchived
  end

  private

  def item_params
    params.require(:item).permit(:body, :complete)
  end
end
