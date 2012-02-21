class ContactSerializer < ApplicationSerializer
  attributes :id, :first_name, :last_name
  has_many :phone_numbers
end
