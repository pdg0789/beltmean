class ShoesController < ApplicationController
  def index
    @shoes = Shoe.where(buyer: nil)
  end

  def create
    @shoe = Shoe.new(shoe_params)

    if @shoe.valid?
        @shoe.save
        flash[:notice] = ["Success!!!"]
        return redirect_to :back
    end

    flash[:errors] = @shoe.errors.full_messages
    return redirect_to :back
  end

  def buy
    Shoe.find(params[:id]).update(buyer: current_user)
		redirect_to :back
  end

  def destroy
    shoe = Shoe.find(params[:id])
    shoe.destroy if current_user == shoe.seller
    redirect_to :back
  end

  private
    def shoe_params
      params.require(:shoe).permit(:name, :price).merge(seller: current_user)
    end
end
