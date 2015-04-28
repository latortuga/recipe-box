class Recipe < ActiveRecord::Base
  def self.search(query)
    like_query = "%#{query}%"
    where(arel_table[:name].matches(like_query))
  end
end
