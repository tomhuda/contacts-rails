class ContactsController < ApplicationController
  respond_to :json

  def current_user
    nil
  end

  def index
    contacts = Contact.all
    respond_with contacts
  end

  def show
    contact = Contact.find(params[:id])
    respond_with contact
  end

  def create
    contact = Contact.create(params[:contact])
    respond_with contact
  end

  def update
    contact = Contact.find(params[:id])
    contact.update_attributes(params[:contact])
    respond_with contact
  end

  def destroy
    contact = Contact.find(params[:id])
    respond_with contact
  end
end
