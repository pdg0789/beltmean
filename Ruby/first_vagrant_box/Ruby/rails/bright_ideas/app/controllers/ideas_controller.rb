class IdeasController < ApplicationController
  before_action :auth, only: [:destroy]
  def index
     @user = current_user
     @ideas = Idea.joins("LEFT OUTER JOIN likes ON likes.idea_id = ideas.id ").group("ideas.id").order("COUNT(likes) DESC")
   end

   def show
     @user = current_user
     @idea = Idea.find(params[:id])
     @users = @idea.users
   end

   def create
     @idea = Idea.new(idea_params)
     @idea.user = current_user
     if idea.save
       flash[:errors] = idea.errors.full_messages
     end
     return redirect_to :back
   end

   def destroy
    @idea = Idea.find(params[:id]).destroy
    return redirect_to :back
   end

   private
     def idea_params
       params.require(:idea).permit(:content)
     end

     def auth
       return redirect_to '/ideas' unless session[:user_id] == Idea.find(params[:id]).user.id
     end

 end
