class StaticsController < ApplicationController
  def plan
    @recipes = []
    1.upto(7).each do |i|
      date = Date.today + i.days - 1
      @recipes << {date: date, name: "Cool Recipe #{i}"}
    end

    @data = {
      recipes: @recipes,
      date_str: "#{Date.today.strftime("%b %-d")}-14",
    }.to_json

    @recipe = {
    }.to_json
  end

  def shop
    @data = {
      items: Item.unarchived,
      url: items_url,
      archive_complete_url: archive_complete_items_url,
      archive_all_url: archive_all_items_url,
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
