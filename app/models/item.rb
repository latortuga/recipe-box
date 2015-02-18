class Item < ActiveRecord::Base
  scope :archived, -> { order('created_at desc').where(arel_table[:archived_at].not_eq(nil)) }
  scope :unarchived, -> { order('created_at desc').where(archived_at: nil) }
  scope :complete, -> { where(complete: true) }

  def self.archive_all
    unarchived.each(&:archive)
  end

  def self.archive_complete
    unarchived.complete.each(&:archive)
  end

  def archive
    update(archived_at: DateTime.now)
  end

  def unarchive
    update(archived_at: nil)
  end
end
