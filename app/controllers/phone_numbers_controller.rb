class PhoneNumbersController < ApplicationController
  respond_to :json

  def current_user
    nil
  end

  def index
    phone_numbers = PhoneNumber.all
    render json: phone_numbers
  end

  def show
    phone_number = PhoneNumber.find(params[:id])
    render json: phone_number
  end

  def create
    if phone_numbers = params[:phone_numbers]
      response = phone_numbers.map do |hash|
        create_single(hash)
      end
    elsif phone_number = params[:phone_number]
      response = create_single(hash)
    end

    render json: response, status: :created
  end

  def update
    if params[:id] == "bulk"
      response = params[:phone_numbers].map do |hash|
        response = update_single(hash.delete(:id), hash)
      end
    else
      response = update_single(params[:id], params[:phone_number])
    end

    render json: response
  end

  def destroy
    if params[:id] == "bulk"
      params[:phone_numbers].each do |id|
        destroy_single(id)
      end
    else
      destroy_single(params[:id])
    end

    head :no_content
  end

private
  def create_single(hash)
    PhoneNumber.create(hash)
  end

  def update_single(id, hash)
    phone_number = PhoneNumber.find(id)
    phone_number.update_attributes(hash)
    phone_number
  end

  def destroy_single(id)
    phone_number = PhoneNumber.find(id)
    phone_number.destroy
    phone_number
  end
end
