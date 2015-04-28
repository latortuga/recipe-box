class AddUrlToRecipes < ActiveRecord::Migration
  def change
    add_column :recipes, :url, :string
  end
end
