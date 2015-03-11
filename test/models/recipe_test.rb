require 'test_helper'

class RecipeTest < ActiveSupport::TestCase
  def test_search_returns_recipes_by_name
    Recipe.create(:name => 'BBQ')

    results = Recipe.search('BBQ')
    assert_match /BBQ/, results.first.name
  end
end
