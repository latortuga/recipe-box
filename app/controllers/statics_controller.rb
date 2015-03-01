class StaticsController < ApplicationController
  def plan
    @recipes = [
      {id: 1, name: 'Whole Chicken'},
      {id: 2, name: 'Steak'},
      {id: 3, name: 'Brinner'},
      {id: 4, name: 'Brinner'},
      {id: 5, name: 'Brinner'},
      {id: 6, name: 'Brinner'},
      {id: 7, name: 'Brinner'},
    ]
    1.upto(7).each do |i|
      date = Date.today + i.days - 1
      @recipes[i-1][:date] = date
    end

    start_date = Date.today
    end_date = start_date + 7.days
    @data = {
      recipes: @recipes,
      date_str: "#{start_date.strftime("%b %-d")} - #{end_date.strftime("%b %-d")}",
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
