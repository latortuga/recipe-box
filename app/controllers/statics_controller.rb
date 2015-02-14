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
      items: Item.all,
      url: items_path,
      poll_interval: 5000,
    }.to_json
  end

  def cook
  end
end
