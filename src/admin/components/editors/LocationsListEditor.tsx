import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetFooter } from '@/components/ui/sheet';
import { Plus, Pencil, Trash2, MapPin } from 'lucide-react';
import { LocationItem } from '@/types/content';
import { ImageField } from '../fields/ImageField';
import { ArrayField } from '../fields/ArrayField';

interface LocationsListEditorProps {
  locations: LocationItem[];
  onChange: (locations: LocationItem[]) => void;
}

export function LocationsListEditor({ locations, onChange }: LocationsListEditorProps) {
  const [editingLocation, setEditingLocation] = useState<LocationItem | null>(null);
  const [open, setOpen] = useState(false);

  const handleSave = (location: LocationItem) => {
    if (editingLocation && locations.some(l => l.id === editingLocation.id)) {
      onChange(locations.map(l => l.id === location.id ? location : l));
    } else {
      onChange([...locations, { ...location, id: Date.now().toString() }]);
    }
    setOpen(false);
    setEditingLocation(null);
  };

  const handleDelete = (id: string) => {
    onChange(locations.filter(l => l.id !== id));
  };

  const openNew = () => {
    setEditingLocation({
      id: '',
      name: '',
      address: { street: '', city: '', state: '', zip: '' },
      phone: '',
      email: '',
      mapUrl: '',
      mapEmbed: '',
      hours: [],
      features: [],
      image: ''
    });
    setOpen(true);
  };

  const openEdit = (location: LocationItem) => {
    setEditingLocation(location);
    setOpen(true);
  };

  return (
    <div className="space-y-4">
      <div className="grid gap-4">
        {locations.map((location) => (
          <Card key={location.id}>
            <CardContent className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-lg bg-muted flex items-center justify-center overflow-hidden">
                    {location.image ? (
                        /* eslint-disable-next-line @next/next/no-img-element */
                        <img src={location.image} alt={location.name} className="h-full w-full object-cover" />
                    ) : (
                        <MapPin className="h-6 w-6 text-muted-foreground" />
                    )}
                </div>
                <div>
                  <h4 className="font-semibold">{location.name}</h4>
                  <div className="text-sm text-muted-foreground flex gap-2">
                     <span>{location.address.city}, {location.address.state}</span>
                     <span>•</span>
                     <span>{location.phone}</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="ghost" size="icon" onClick={() => openEdit(location)}>
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => handleDelete(location.id)}>
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
        
        <Button variant="outline" className="w-full border-dashed" onClick={openNew}>
          <Plus className="h-4 w-4 mr-2" />
          Add Location
        </Button>
      </div>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent className="w-[400px] sm:w-[540px] overflow-y-auto">
          <SheetHeader>
            <SheetTitle>{editingLocation?.id ? 'Edit Location' : 'Add Location'}</SheetTitle>
            <SheetDescription>
              Details for this physical location.
            </SheetDescription>
          </SheetHeader>
          
          {editingLocation && (
            <LocationForm 
                location={editingLocation} 
                onSave={handleSave} 
                onCancel={() => setOpen(false)}
            />
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}

function LocationForm({ location, onSave, onCancel }: { location: LocationItem, onSave: (l: LocationItem) => void, onCancel: () => void }) {
    const [formData, setFormData] = useState<LocationItem>(location);

    const updateAddress = (field: keyof LocationItem['address'], value: string) => {
        setFormData(prev => ({
            ...prev,
            address: { ...prev.address, [field]: value }
        }));
    };

    return (
        <div className="space-y-6 py-6">
            <div className="space-y-4">
                <div className="grid gap-2">
                    <Label htmlFor="name">Location Name</Label>
                    <Input id="name" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} placeholder="e.g. Mequon" />
                </div>

                <div className="grid gap-2">
                    <Label>Address</Label>
                    <Input value={formData.address.street} onChange={e => updateAddress('street', e.target.value)} placeholder="Street Address" />
                    <div className="grid grid-cols-2 gap-2">
                        <Input value={formData.address.city} onChange={e => updateAddress('city', e.target.value)} placeholder="City" />
                        <div className="grid grid-cols-2 gap-2">
                            <Input value={formData.address.state} onChange={e => updateAddress('state', e.target.value)} placeholder="State" />
                            <Input value={formData.address.zip} onChange={e => updateAddress('zip', e.target.value)} placeholder="Zip" />
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="phone">Phone</Label>
                        <Input id="phone" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
                    </div>
                </div>
                
                <div className="grid gap-2">
                    <Label htmlFor="mapUrl">Google Maps Link</Label>
                    <Input id="mapUrl" value={formData.mapUrl} onChange={e => setFormData({...formData, mapUrl: e.target.value})} placeholder="https://maps.google.com/..." />
                </div>
                
                 <div className="grid gap-2">
                    <Label htmlFor="mapEmbed">Map Embed URL</Label>
                    <Input id="mapEmbed" value={formData.mapEmbed} onChange={e => setFormData({...formData, mapEmbed: e.target.value})} placeholder="https://www.google.com/maps/embed?..." />
                    <p className="text-xs text-muted-foreground">Paste the &quot;Embed a map&quot; URL from Google Maps (src attribute only).</p>
                </div>

                <div className="grid gap-2">
                    <Label>Business Hours</Label>
                    {/* Simple array editor for hours objects */}
                     <ArrayField 
                        label=""
                        items={formData.hours.map(h => `${h.days}: ${h.hours}`)}
                        onChange={(items: unknown[]) => {
                            // Parse strings back to objects
                            const newHours = (items as string[]).map(item => {
                                const [days, ...rest] = item.split(':');
                                return { days: days.trim(), hours: rest.join(':').trim() };
                            });
                             setFormData({...formData, hours: newHours});
                        }}
                        defaultItem=""
                        renderItem={(item, _, onChange) => (
                            <Input 
                                value={item} 
                                onChange={(e) => onChange(e.target.value)} 
                                placeholder="e.g. Monday: 9:00 AM - 5:00 PM" 
                            />
                        )}
                    />
                </div>

                 <div className="grid gap-2">
                    <Label>Features</Label>
                    <ArrayField 
                        label="" 
                        items={formData.features} 
                        onChange={(items) => setFormData({...formData, features: items as string[]})}
                        defaultItem=""
                        renderItem={(item, _, onChange) => (
                            <Input 
                                value={item} 
                                onChange={(e) => onChange(e.target.value)} 
                                placeholder="e.g. Free Parking" 
                            />
                        )}
                    />
                </div>
                
                 <div className="grid gap-2">
                    <ImageField 
                        label="Location Image" 
                        value={formData.image} 
                        onChange={(url) => setFormData({...formData, image: url})} 
                    />
                </div>
            </div>

            <SheetFooter>
                <Button variant="outline" onClick={onCancel}>Cancel</Button>
                <Button onClick={() => onSave(formData)}>Save Location</Button>
            </SheetFooter>
        </div>
    );
}
