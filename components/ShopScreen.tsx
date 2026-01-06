
import React from 'react';
import { soundService } from '../services/soundService';

const products = [
  { id: 1, name: "Hyaluronic Acid", price: "$24", img: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&h=400&fit=crop", color: "bg-blue-500" },
  { id: 2, name: "Gentle Cleanser", price: "$18", img: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=400&fit=crop", color: "bg-green-500" },
  { id: 3, name: "Retinol Cream", price: "$32", img: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=400&h=400&fit=crop", color: "bg-purple-500" },
  { id: 4, name: "Vitamin C Serum", price: "$28", img: "https://images.unsplash.com/photo-1612817288484-6f916006741a?w=400&h=400&fit=crop", color: "bg-orange-500" },
];

const ShopScreen: React.FC = () => {
  return (
    <div className="flex-1 flex flex-col p-6 animate-fade-in overflow-y-auto no-scrollbar pb-24">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-black text-white">Skin Store</h2>
          <p className="text-slate-400 font-medium">Curated for your routine</p>
        </div>
        <button className="size-12 rounded-full glass-button flex items-center justify-center relative">
          <span className="material-symbols-outlined text-2xl">shopping_cart</span>
          <span className="absolute top-0 right-0 size-4 bg-primary rounded-full text-[10px] flex items-center justify-center font-bold">2</span>
        </button>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {products.map(p => (
          <div key={p.id} className="group flex flex-col cursor-pointer" onClick={() => soundService.playPop()}>
            <div className="aspect-square rounded-[2rem] overflow-hidden glass-panel mb-4 relative">
              <img src={p.img} alt={p.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              <button className="absolute bottom-4 right-4 size-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-primary transition-colors">
                <span className="material-symbols-outlined text-xl">add</span>
              </button>
            </div>
            <h3 className="font-bold text-lg mb-1">{p.name}</h3>
            <p className="text-primary font-black">{p.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShopScreen;
