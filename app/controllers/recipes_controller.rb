class RecipesController < ApplicationController
  def index
    render json: Recipe.all
  end

  def create
    render json: Recipe.create(recipe_params)
  end

  def update
    @recipe = Recipe.find(params[:recipe][:id])
    @recipe.update(recipe_params)

    render json: @recipe
  end

  def search
    render json: Recipe.search(params[:q])
  end

  private

  def recipe_params
    params.require(:recipe).permit(:name, :description, :url)
  end
end
