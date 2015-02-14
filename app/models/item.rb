class Item < ActiveRecord::Base
  scope :unarchived, -> { order('id asc').where(archived_at: nil) }
end
