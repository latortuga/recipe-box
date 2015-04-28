require 'test_helper'

class RecipeTest < ActiveSupport::TestCase
  def test_search_returns_recipes_by_name
    r = Recipe.create(name: 'BBQ')

    results = Recipe.search('BBQ')
    assert_includes results, r
  end

  def test_search_searches_by_fuzzy_match
    r = Recipe.create(name: 'Testing 123')

    results = Recipe.search('123')
    assert_includes results, r
  end
end
