class StaticsController < ApplicationController
  def plan
    @recipes = Recipe.all

    start_date = Date.today
    end_date = start_date + 7.days
    @data = {
      recipes: @recipes,
      recipes_url: recipes_url(format: :json),
      date_str: "#{start_date.strftime("%b %-d")} - #{end_date.strftime("%b %-d")}",
    }.to_json

    @recipe = {
    }.to_json
  end

  def shop
    @data = {
      items: Item.unarchived,
      url: items_url(format: :json),
      archive_complete_url: archive_complete_items_url(format: :json),
      archive_all_url: archive_all_items_url(format: :json),
      poll_interval: 10_000,
    }.to_json
  end

  def cook
    @data = {
      recipes: [
        {id: 1, name: 'Whole Chicken'},
        {id: 2, name: 'Steak'},
        {id: 3, name: 'Brinner'},
      ],
    }.to_json
  end
end
