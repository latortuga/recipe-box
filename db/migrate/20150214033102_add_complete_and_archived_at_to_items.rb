class AddCompleteAndArchivedAtToItems < ActiveRecord::Migration
  def change
    add_column :items, :complete, :boolean, default: false
    add_column :items, :archived_at, :datetime
  end
end
