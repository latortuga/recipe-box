class Recipe < ActiveRecord::Base
  def self.search(query)
    where(name: query)
  end
end
