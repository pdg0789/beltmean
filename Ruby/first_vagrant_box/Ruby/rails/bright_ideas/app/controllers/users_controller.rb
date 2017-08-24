class UsersController < ApplicationController
  skip_before_action :require_login, only: [:create, :index]
  def index
    @user = current_user
  end
  def show
    @user = User.find(params[:id])
  end
  def create
    user = User.new(user_params)

    if user.valid?
      flash[:notice] = ["Registered successfully"]
      session[:user_id] = user.id
      return redirect_to '/ideas'
    else
      errors = user.errors.full_messages
      flash[:errors] = errors
      return redirect_to :back
    end
  end

  private
      def user_params
          params.require(:user).permit(:name, :alias, :email, :password, :password_confirmation)
      end
      def auth
        return redirect_to '/ideas' unless session[:user_id].to_s == params[:id]
      end
    end
