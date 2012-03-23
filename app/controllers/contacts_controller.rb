class ContactsController < ApplicationController
  respond_to :json

  def current_user
    nil
  end

  def index
    if ids = params[:ids]
      contacts = Contact.where(id: ids)
    else
      contacts = Contact.all
    end

    render json: contacts
  end

  def show
    contact = Contact.find(params[:id])
    respond_with contact
  end

  def create
    if contacts = params[:contacts]
      response = contacts.map do |hash|
        create_single(hash)
      end
    elsif contact = params[:contact]
      response = create_single(hash)
    end

    render json: response, status: :created
  end

  def update
    if params[:id] == "bulk"
      response = params[:contacts].map do |hash|
        response = update_single(hash.delete(:id), hash)
      end
    else
      response = update_single(params[:id], params[:contact])
    end

    render json: response
  end

  def destroy
    if params[:id] == "bulk"
      params[:contacts].each do |id|
        destroy_single(id)
      end
    else
      destroy_single(params[:id])
    end

    head :no_content
  end

private
  def create_single(hash)
    Contact.create(hash)
  end

  def update_single(id, hash)
    contact = Contact.find(id)
    contact.update_attributes(hash)
    contact
  end

  def destroy_single(id)
    contact = Contact.find(id)
    contact.destroy
    contact
  end
end
