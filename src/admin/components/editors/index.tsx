"use client";
import { useAdminStore } from '@/admin/store/useAdminStore';
import { TextField, TextAreaField, ImageField, IconField } from '../fields';
import { ArrayField } from '../fields/ArrayField';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LocationsListEditor } from './LocationsListEditor';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';

// ==================== TOP BAR ====================
export function TopBarEditor() {
  const { draftContent, updateDraft } = useAdminStore();
  const site = draftContent.site;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Top Bar</h1>
        <p className="text-muted-foreground">Edit the top information bar that appears above the header</p>
      </div>

      <Card>
        <CardHeader><CardTitle>Top Bar Content</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <TextField 
            label="Site Name" 
            value={site.name} 
            onChange={(v) => updateDraft('site.name', v)} 
            required 
            helperText="Displayed on the left side of the top bar"
          />
          <TextField 
            label="Tagline" 
            value={site.tagline} 
            onChange={(v) => updateDraft('site.tagline', v)} 
            helperText="Appears next to the site name"
          />
          <TextField 
            label="Phone Number" 
            value={site.phone} 
            onChange={(v) => updateDraft('site.phone', v)} 
            required
            helperText="Displayed on the right side with a phone icon (clickable)"
          />
        </CardContent>
      </Card>

      <Card className="border-dashed">
        <CardContent className="py-4">
          <p className="text-sm text-muted-foreground">
            <strong>Preview:</strong> The top bar displays "{site.name} – {site.tagline}" on the left and "{site.phone}" on the right.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

// ==================== SITE INFO ====================
export function SiteInfoEditor() {
  const { draftContent, updateDraft } = useAdminStore();
  const site = draftContent.site;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Site Information</h1>
        <p className="text-muted-foreground">Update your business details</p>
      </div>

      <Card>
        <CardHeader><CardTitle>Basic Info</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-6">
            <div className="flex-1 space-y-4">
              <TextField label="Site Name" value={site.name} onChange={(v) => updateDraft('site.name', v)} required />
              <TextField label="Tagline" value={site.tagline} onChange={(v) => updateDraft('site.tagline', v)} />
              <TextField label="Phone" value={site.phone} onChange={(v) => updateDraft('site.phone', v)} />
              <TextField label="Email" value={site.email} onChange={(v) => updateDraft('site.email', v)} />
            </div>
            <div className="w-1/3">
               <ImageField label="Site Logo" value={site.logo || ''} onChange={(v) => updateDraft('site.logo', v)} />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Address</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <TextField label="Street" value={site.address.street} onChange={(v) => updateDraft('site.address.street', v)} />
          <div className="grid grid-cols-3 gap-4">
            <TextField label="City" value={site.address.city} onChange={(v) => updateDraft('site.address.city', v)} />
            <TextField label="State" value={site.address.state} onChange={(v) => updateDraft('site.address.state', v)} />
            <TextField label="ZIP" value={site.address.zip} onChange={(v) => updateDraft('site.address.zip', v)} />
          </div>
          <TextField label="Map URL" value={site.address.mapUrl} onChange={(v) => updateDraft('site.address.mapUrl', v)} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Business Hours</CardTitle></CardHeader>
        <CardContent>
          <ArrayField
            label="Operating Hours"
            items={site.hours || []}
            onChange={(items) => updateDraft('site.hours', items)}
            defaultItem={{ days: '', hours: '' }}
            addLabel="Add Hours"
            renderItem={(item, _, onChange) => (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-xs text-muted-foreground">Days</Label>
                  <Input
                    value={item.days}
                    onChange={(e) => onChange({ ...item, days: e.target.value })}
                    placeholder="e.g. Monday - Friday"
                  />
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">Hours</Label>
                  <Input
                    value={item.hours}
                    onChange={(e) => onChange({ ...item, hours: e.target.value })}
                    placeholder="e.g. 9:00 AM - 5:00 PM"
                  />
                </div>
              </div>
            )}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Social Links</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <TextField label="Facebook" value={site.social.facebook} onChange={(v) => updateDraft('site.social.facebook', v)} />
          <TextField label="Instagram" value={site.social.instagram} onChange={(v) => updateDraft('site.social.instagram', v)} />
          <TextField label="YouTube" value={site.social.youtube} onChange={(v) => updateDraft('site.social.youtube', v)} />
          <TextField label="Google" value={site.social.google} onChange={(v) => updateDraft('site.social.google', v)} />
        </CardContent>
      </Card>
    </div>
  );
}

// ==================== HERO ====================
export function HeroEditor() {
  const { draftContent, updateDraft } = useAdminStore();
  const hero = draftContent.hero;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Hero Section</h1>
        <p className="text-muted-foreground">Edit your homepage hero content</p>
      </div>
      <Card>
        <CardContent className="pt-6 space-y-4">
          <TextField label="Pretitle" value={hero.pretitle} onChange={(v) => updateDraft('hero.pretitle', v)} />
          <TextField label="Title" value={hero.title} onChange={(v) => updateDraft('hero.title', v)} />
          <TextAreaField label="Description" value={hero.description} onChange={(v) => updateDraft('hero.description', v)} />
          <TextAreaField label="Sub Description" value={hero.subDescription || ''} onChange={(v) => updateDraft('hero.subDescription', v)} />
          <TextField label="CTA Text" value={hero.ctaText} onChange={(v) => updateDraft('hero.ctaText', v)} />
          <TextField label="CTA Link" value={hero.ctaLink} onChange={(v) => updateDraft('hero.ctaLink', v)} />
          <TextField label="Secondary CTA Text" value={hero.secondaryCtaText} onChange={(v) => updateDraft('hero.secondaryCtaText', v)} />
          <ImageField label="Hero Image" value={hero.image} onChange={(v) => updateDraft('hero.image', v)} />
        </CardContent>
      </Card>
    </div>
  );
}

// ==================== ABOUT ====================
export function AboutEditor() {
  const { draftContent, updateDraft } = useAdminStore();
  const about = draftContent.about;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">About Section</h1>
        <p className="text-muted-foreground">Edit your about content</p>
      </div>

      <Tabs defaultValue="content" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="stats">Stats</TabsTrigger>
          <TabsTrigger value="values">Values</TabsTrigger>
          <TabsTrigger value="team">Team</TabsTrigger>
        </TabsList>

        <TabsContent value="content" className="space-y-4 mt-4">
          <Card>
            <CardContent className="pt-6 space-y-4">
              <TextField label="Pretitle" value={about.pretitle} onChange={(v) => updateDraft('about.pretitle', v)} />
              <TextField label="Title" value={about.title} onChange={(v) => updateDraft('about.title', v)} />
              <TextAreaField label="Description" value={about.description} onChange={(v) => updateDraft('about.description', v)} />
              <TextAreaField label="Long Description" value={about.longDescription} onChange={(v) => updateDraft('about.longDescription', v)} />
              <ImageField label="Image" value={about.image} onChange={(v) => updateDraft('about.image', v)} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="stats" className="mt-4">
          <Card>
            <CardContent className="pt-6">
              <ArrayField
                label="Statistics"
                items={about.stats || []}
                onChange={(items) => updateDraft('about.stats', items)}
                defaultItem={{ value: '', label: '' }}
                addLabel="Add Stat"
                renderItem={(item, _, onChange) => (
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-xs text-muted-foreground">Value</Label>
                      <Input
                        value={item.value}
                        onChange={(e) => onChange({ ...item, value: e.target.value })}
                        placeholder="e.g. 500+"
                      />
                    </div>
                    <div>
                      <Label className="text-xs text-muted-foreground">Label</Label>
                      <Input
                        value={item.label}
                        onChange={(e) => onChange({ ...item, label: e.target.value })}
                        placeholder="e.g. Active Students"
                      />
                    </div>
                  </div>
                )}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="values" className="mt-4">
          <Card>
            <CardContent className="pt-6">
              <ArrayField
                label="Core Values"
                items={about.values || []}
                onChange={(items) => updateDraft('about.values', items)}
                defaultItem={{ title: '', description: '', icon: 'star' }}
                addLabel="Add Value"
                renderItem={(item, _, onChange) => (
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="text-xs text-muted-foreground">Title</Label>
                        <Input
                          value={item.title}
                          onChange={(e) => onChange({ ...item, title: e.target.value })}
                          placeholder="e.g. Discipline"
                        />
                      </div>
                      <div>
                        <Label className="text-xs text-muted-foreground">Icon</Label>
                        <Input
                          value={item.icon}
                          onChange={(e) => onChange({ ...item, icon: e.target.value })}
                          placeholder="e.g. shield, heart, trophy"
                        />
                      </div>
                    </div>
                    <div>
                      <Label className="text-xs text-muted-foreground">Description</Label>
                      <Input
                        value={item.description}
                        onChange={(e) => onChange({ ...item, description: e.target.value })}
                        placeholder="Value description..."
                      />
                    </div>
                  </div>
                )}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="team" className="mt-4">
          <Card>
            <CardContent className="pt-6">
              <ArrayField
                label="Team Members"
                items={about.team || []}
                onChange={(items) => updateDraft('about.team', items)}
                defaultItem={{ name: '', title: '', bio: '', image: '', commitments: [], instructorNote: '' }}
                addLabel="Add Team Member"
                renderItem={(item, _, onChange) => (
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="text-xs text-muted-foreground">Name</Label>
                        <Input
                          value={item.name}
                          onChange={(e) => onChange({ ...item, name: e.target.value })}
                          placeholder="Full name"
                        />
                      </div>
                      <div>
                        <Label className="text-xs text-muted-foreground">Title</Label>
                        <Input
                          value={item.title}
                          onChange={(e) => onChange({ ...item, title: e.target.value })}
                          placeholder="e.g. Head Instructor"
                        />
                      </div>
                    </div>
                    <div>
                      <Label className="text-xs text-muted-foreground">Bio</Label>
                      <Input
                        value={item.bio}
                        onChange={(e) => onChange({ ...item, bio: e.target.value })}
                        placeholder="Short biography..."
                      />
                    </div>
                    <div>
                      <Label className="text-xs text-muted-foreground">Image URL</Label>
                      <Input
                        value={item.image}
                        onChange={(e) => onChange({ ...item, image: e.target.value })}
                        placeholder="/src/assets/coach.jpg"
                      />
                    </div>
                    <div>
                      <Label className="text-xs text-muted-foreground mb-2 block">Commitments</Label>
                      <ArrayField
                        label=""
                        items={item.commitments || []}
                        onChange={(commitments) => onChange({ ...item, commitments })}
                        defaultItem=""
                        addLabel="Add Commitment"
                        renderItem={(commitment, _, onChangeCommitment) => (
                          <Input
                            value={commitment}
                            onChange={(e) => onChangeCommitment(e.target.value)}
                            placeholder="e.g. Create an enjoyable and safe learning environment."
                          />
                        )}
                      />
                    </div>
                    <div>
                      <Label className="text-xs text-muted-foreground">Instructor Note</Label>
                      <Input
                        value={item.instructorNote || ''}
                        onChange={(e) => onChange({ ...item, instructorNote: e.target.value })}
                        placeholder="e.g. Our Certified Instructors have all studied under MASTER BOWMAN"
                      />
                    </div>
                  </div>
                )}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

// ==================== BENEFITS ====================
export function BenefitsEditor() {
  const { draftContent, updateDraft } = useAdminStore();
  const benefits = draftContent.benefits;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Benefits Section</h1>
        <p className="text-muted-foreground">Edit benefits content</p>
      </div>

      <Card>
        <CardHeader><CardTitle>Section Header</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <TextField label="Pretitle" value={benefits.pretitle} onChange={(v) => updateDraft('benefits.pretitle', v)} />
          <TextField label="Title" value={benefits.title} onChange={(v) => updateDraft('benefits.title', v)} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Benefit Items</CardTitle></CardHeader>
        <CardContent>
          <ArrayField
            label="Benefits"
            items={benefits.items || []}
            onChange={(items) => updateDraft('benefits.items', items)}
            defaultItem={{ icon: 'star', title: '', description: '' }}
            addLabel="Add Benefit"
            maxItems={6}
            renderItem={(item, _, onChange) => (
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-xs text-muted-foreground">Title</Label>
                    <Input
                      value={item.title}
                      onChange={(e) => onChange({ ...item, title: e.target.value })}
                      placeholder="e.g. CONFIDENCE"
                    />
                  </div>
                  <div>
                    <Label className="text-xs text-muted-foreground">Icon</Label>
                    <Input
                      value={item.icon}
                      onChange={(e) => onChange({ ...item, icon: e.target.value })}
                      placeholder="e.g. star, target, zap"
                    />
                  </div>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">Description</Label>
                  <Input
                    value={item.description}
                    onChange={(e) => onChange({ ...item, description: e.target.value })}
                    placeholder="Benefit description..."
                  />
                </div>
              </div>
            )}
          />
        </CardContent>
      </Card>
      <Card>
        <CardHeader><CardTitle>Additional Skills</CardTitle></CardHeader>
        <CardContent>
          <ArrayField
            label="Additional Skills"
            items={(benefits.additionalSkills || []).map(item => 
              typeof item === 'string' ? item : ''
            )}
            onChange={(items) => {
              // Normalize items to ensure they're all strings
              const normalized = items.map(item => 
                typeof item === 'string' ? item : ''
              );
              updateDraft('benefits.additionalSkills', normalized);
            }}
            defaultItem=""
            addLabel="Add Skill"
            renderItem={(item, _, onChange) => {
              // Safely extract string value from item
              const stringValue = typeof item === 'string' ? item : '';
              return (
                <Input
                  value={stringValue}
                  onChange={(e) => onChange(e.target.value)}
                  placeholder="e.g. DISCIPLINE, SELF-CONFIDENCE"
                />
              );
            }}
          />
        </CardContent>
      </Card>
    </div>
  );
}

// ==================== LOCATION ====================
export function LocationEditor() {
  const { draftContent, updateDraft } = useAdminStore();
  const location = draftContent.location;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Location</h1>
        <p className="text-muted-foreground">Edit location information</p>
      </div>

      <Card>
        <CardHeader><CardTitle>Basic Info</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <TextField label="Section Title" value={location.title} onChange={(v) => updateDraft('location.title', v)} />
          <TextAreaField label="Description" value={location.description} onChange={(v) => updateDraft('location.description', v)} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
            <CardTitle>Physical Locations</CardTitle>
            <CardDescription>Manage your studio locations. These will appear on the Locations page.</CardDescription>
        </CardHeader>
        <CardContent>
            <LocationsListEditor
                locations={location.items || []}
                onChange={(items) => updateDraft('location.items', items)}
            />
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Facility Features (General)</CardTitle></CardHeader>
        <CardContent>
          <ArrayField
            label="Features"
            items={location.features || []}
            onChange={(items) => updateDraft('location.features', items)}
            defaultItem=""
            addLabel="Add Feature"
            renderItem={(item, _, onChange) => (
              <Input
                value={item}
                onChange={(e) => onChange(e.target.value)}
                placeholder="e.g. Climate controlled training area"
              />
            )}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Service Areas</CardTitle></CardHeader>
        <CardContent>
          <ArrayField
            label="Nearby Areas"
            items={location.nearbyAreas || []}
            onChange={(items) => updateDraft('location.nearbyAreas', items)}
            defaultItem=""
            addLabel="Add Area"
            renderItem={(item, _, onChange) => (
              <Input
                value={item}
                onChange={(e) => onChange(e.target.value)}
                placeholder="e.g. Chandler, Gilbert, Tempe"
              />
            )}
          />
        </CardContent>
      </Card>
    </div>
  );
}

// ==================== CTA ====================
export function CTAEditor() {
  const { draftContent, updateDraft } = useAdminStore();
  const cta = draftContent.cta;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Call to Action</h1>
        <p className="text-muted-foreground">Edit CTA section</p>
      </div>
      <Card>
        <CardContent className="pt-6 space-y-4">
          <TextField label="Title" value={cta.title} onChange={(v) => updateDraft('cta.title', v)} />
          <TextAreaField label="Description" value={cta.description} onChange={(v) => updateDraft('cta.description', v)} />
          <TextField label="Button Text" value={cta.buttonText} onChange={(v) => updateDraft('cta.buttonText', v)} />
          <TextField label="Button Link" value={cta.buttonLink} onChange={(v) => updateDraft('cta.buttonLink', v)} />
          <TextField label="Urgency Text" value={cta.urgencyText} onChange={(v) => updateDraft('cta.urgencyText', v)} />
        </CardContent>
      </Card>
    </div>
  );
}

// ==================== FOOTER ====================
export function FooterEditor() {
  const { draftContent, updateDraft } = useAdminStore();
  const footer = draftContent.footer;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Footer</h1>
        <p className="text-muted-foreground">Edit footer content</p>
      </div>

      <Card>
        <CardHeader><CardTitle>General</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <TextAreaField label="Description" value={footer.description} onChange={(v) => updateDraft('footer.description', v)} />
          <TextField label="Copyright" value={footer.copyright} onChange={(v) => updateDraft('footer.copyright', v)} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Quick Links</CardTitle></CardHeader>
        <CardContent>
          <ArrayField
            label="Links"
            items={footer.quickLinks || []}
            onChange={(items) => updateDraft('footer.quickLinks', items)}
            defaultItem={{ label: '', path: '' }}
            addLabel="Add Link"
            renderItem={(item, _, onChange) => (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-xs text-muted-foreground">Label</Label>
                  <Input
                    value={item.label}
                    onChange={(e) => onChange({ ...item, label: e.target.value })}
                    placeholder="Link text"
                  />
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">Path</Label>
                  <Input
                    value={item.path}
                    onChange={(e) => onChange({ ...item, path: e.target.value })}
                    placeholder="/about"
                  />
                </div>
              </div>
            )}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Legal Links</CardTitle></CardHeader>
        <CardContent>
          <ArrayField
            label="Links"
            items={(footer as any).legalLinks || []}
            onChange={(items) => updateDraft('footer.legalLinks', items)}
            defaultItem={{ label: '', path: '' }}
            addLabel="Add Link"
            renderItem={(item, _, onChange) => (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-xs text-muted-foreground">Label</Label>
                  <Input
                    value={item.label}
                    onChange={(e) => onChange({ ...item, label: e.target.value })}
                    placeholder="e.g. Privacy Policy"
                  />
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">Path</Label>
                  <Input
                    value={item.path}
                    onChange={(e) => onChange({ ...item, path: e.target.value })}
                    placeholder="/privacy"
                  />
                </div>
              </div>
            )}
          />
        </CardContent>
      </Card>
    </div>
  );
}

// ==================== NAVIGATION ====================
export function NavigationEditor() {
  const { draftContent, updateDraft } = useAdminStore();
  const navigation = draftContent.navigation || [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Navigation</h1>
        <p className="text-muted-foreground">Edit site navigation menu</p>
      </div>

      <Card>
        <CardHeader><CardTitle>Menu Items</CardTitle></CardHeader>
        <CardContent>
          <ArrayField
            label="Navigation Links"
            items={navigation}
            onChange={(items) => updateDraft('navigation', items)}
            defaultItem={{ label: '', path: '', children: [] }}
            addLabel="Add Menu Item"
            renderItem={(item, _, onChange) => {
              const hasDropdown = Array.isArray(item.children);
              
              return (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-xs text-muted-foreground">Label</Label>
                      <Input
                        value={item.label}
                        onChange={(e) => onChange({ ...item, label: e.target.value })}
                        placeholder="Menu item text"
                      />
                    </div>
                    <div>
                      <Label className="text-xs text-muted-foreground">Path</Label>
                      <Input
                        value={item.path}
                        onChange={(e) => onChange({ ...item, path: e.target.value })}
                        placeholder="/about"
                      />
                    </div>
                  </div>

                  {/* Dropdown Toggle */}
                  <div className="flex items-center justify-between rounded-lg border border-border p-3">
                    <div className="space-y-0.5">
                      <Label className="text-sm font-medium">Has Dropdown Menu</Label>
                      <p className="text-xs text-muted-foreground">
                        Enable to add dropdown items to this menu item
                      </p>
                    </div>
                    <Switch
                      checked={hasDropdown}
                      onCheckedChange={(checked) => {
                        onChange({
                          ...item,
                          children: checked ? (item.children || []) : []
                        });
                      }}
                    />
                  </div>

                  {/* Editable Dropdown Items */}
                  {hasDropdown && (
                    <div className="pl-4 border-l-2 border-primary/30 bg-muted/30 rounded-r-lg p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <Label className="text-sm font-medium">Dropdown Items</Label>
                        <span className="text-xs text-muted-foreground">
                          {item.children?.length || 0} item{(item.children?.length || 0) !== 1 ? 's' : ''}
                        </span>
                      </div>
                      
                      <ArrayField
                        label=""
                        items={item.children || []}
                        onChange={(children) => onChange({ ...item, children })}
                        defaultItem={{ label: '', path: '' }}
                        addLabel="Add Dropdown Item"
                        renderItem={(child, childIndex, onChildChange) => (
                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <Label className="text-xs text-muted-foreground">Label</Label>
                              <Input
                                value={child.label || ''}
                                onChange={(e) => onChildChange({ ...child, label: e.target.value })}
                                placeholder="Dropdown item text"
                              />
                            </div>
                            <div>
                              <Label className="text-xs text-muted-foreground">Path</Label>
                              <Input
                                value={child.path || ''}
                                onChange={(e) => onChildChange({ ...child, path: e.target.value })}
                                placeholder="/programs/example"
                              />
                            </div>
                          </div>
                        )}
                      />
                    </div>
                  )}
                </div>
              );
            }}
          />
        </CardContent>
      </Card>

      <Card className="border-dashed">
        <CardContent className="py-4">
          <p className="text-sm text-muted-foreground">
            <strong>Note:</strong> Dropdown menus are supported. Items with children will display as dropdown menus in the navigation bar.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

// ==================== CALENDAR ====================
export function CalendarEditor() {
  const { draftContent, updateDraft } = useAdminStore();
  const events = draftContent.calendarEvents || [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Calendar Events</h1>
        <p className="text-muted-foreground">Manage calendar events ({events.length} total)</p>
      </div>

      <Card>
        <CardHeader><CardTitle>Events</CardTitle></CardHeader>
        <CardContent>
          <ArrayField
            label="Calendar Events"
            items={events}
            onChange={(items) => updateDraft('calendarEvents', items)}
            defaultItem={{ 
              id: 0, 
              title: '', 
              date: new Date().toISOString().split('T')[0], 
              time: '', 
              program: '', 
              description: '', 
              instructor: '' 
            }}
            addLabel="Add Event"
            renderItem={(item, _, onChange) => (
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-xs text-muted-foreground">Title</Label>
                    <Input
                      value={item.title}
                      onChange={(e) => onChange({ ...item, title: e.target.value })}
                      placeholder="Event title"
                    />
                  </div>
                  <div>
                    <Label className="text-xs text-muted-foreground">Date</Label>
                    <Input
                      type="date"
                      value={item.date}
                      onChange={(e) => onChange({ ...item, date: e.target.value })}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-xs text-muted-foreground">Time</Label>
                    <Input
                      value={item.time}
                      onChange={(e) => onChange({ ...item, time: e.target.value })}
                      placeholder="e.g. 4:00 PM - 5:00 PM"
                    />
                  </div>
                  <div>
                    <Label className="text-xs text-muted-foreground">Program</Label>
                    <Input
                      value={item.program}
                      onChange={(e) => onChange({ ...item, program: e.target.value })}
                      placeholder="e.g. little-champions"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-xs text-muted-foreground">Description</Label>
                    <Input
                      value={item.description}
                      onChange={(e) => onChange({ ...item, description: e.target.value })}
                      placeholder="Event description"
                    />
                  </div>
                  <div>
                    <Label className="text-xs text-muted-foreground">Instructor</Label>
                    <Input
                      value={item.instructor}
                      onChange={(e) => onChange({ ...item, instructor: e.target.value })}
                      placeholder="e.g. Coach Sarah"
                    />
                  </div>
                </div>
              </div>
            )}
          />
        </CardContent>
      </Card>
    </div>
  );
}

// ==================== BIRTHDAY ====================
export function BirthdayEditor() {
  const { draftContent, updateDraft } = useAdminStore();
  const birthday = draftContent.birthdayParty;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Birthday Parties</h1>
        <p className="text-muted-foreground">Edit birthday party content</p>
      </div>

      <Tabs defaultValue="content" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="features">Features</TabsTrigger>
          <TabsTrigger value="packages">Packages</TabsTrigger>
          <TabsTrigger value="testimonials">Testimonials</TabsTrigger>
        </TabsList>

        <TabsContent value="content" className="space-y-4 mt-4">
          <Card>
            <CardContent className="pt-6 space-y-4">
              <TextField label="Title" value={birthday.title} onChange={(v) => updateDraft('birthdayParty.title', v)} />
              <TextField label="Subtitle" value={birthday.subtitle} onChange={(v) => updateDraft('birthdayParty.subtitle', v)} />
              <TextAreaField label="Description" value={birthday.description} onChange={(v) => updateDraft('birthdayParty.description', v)} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="features" className="mt-4">
          <Card>
            <CardContent className="pt-6">
              <ArrayField
                label="Party Features"
                items={birthday.features || []}
                onChange={(items) => updateDraft('birthdayParty.features', items)}
                defaultItem=""
                addLabel="Add Feature"
                renderItem={(item, _, onChange) => (
                  <Input
                    value={item}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder="e.g. 2 Hours of Non-Stop Fun"
                  />
                )}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="packages" className="mt-4">
          <Card>
            <CardContent className="pt-6">
              <ArrayField
                label="Party Packages"
                items={birthday.packages || []}
                onChange={(items) => updateDraft('birthdayParty.packages', items)}
                defaultItem={{ name: '', price: '', guests: '', includes: [] }}
                addLabel="Add Package"
                maxItems={4}
                renderItem={(item, _, onChange) => (
                  <div className="space-y-3">
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <Label className="text-xs text-muted-foreground">Name</Label>
                        <Input
                          value={item.name}
                          onChange={(e) => onChange({ ...item, name: e.target.value })}
                          placeholder="e.g. Bronze Package"
                        />
                      </div>
                      <div>
                        <Label className="text-xs text-muted-foreground">Price</Label>
                        <Input
                          value={item.price}
                          onChange={(e) => onChange({ ...item, price: e.target.value })}
                          placeholder="e.g. $299"
                        />
                      </div>
                      <div>
                        <Label className="text-xs text-muted-foreground">Guests</Label>
                        <Input
                          value={item.guests}
                          onChange={(e) => onChange({ ...item, guests: e.target.value })}
                          placeholder="e.g. Up to 15 kids"
                        />
                      </div>
                    </div>
                    <div>
                      <Label className="text-xs text-muted-foreground">Includes (comma separated)</Label>
                      <Input
                        value={Array.isArray(item.includes) ? item.includes.join(', ') : item.includes}
                        onChange={(e) => onChange({ ...item, includes: e.target.value.split(',').map(s => s.trim()) })}
                        placeholder="2 hour party, Instructor-led activities, Party room rental"
                      />
                    </div>
                  </div>
                )}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="testimonials" className="mt-4">
          <Card>
            <CardContent className="pt-6">
              <ArrayField
                label="Parent Testimonials"
                items={birthday.testimonials || []}
                onChange={(items) => updateDraft('birthdayParty.testimonials', items)}
                defaultItem={{ name: '', text: '' }}
                addLabel="Add Testimonial"
                renderItem={(item, _, onChange) => (
                  <div className="space-y-3">
                    <div>
                      <Label className="text-xs text-muted-foreground">Name</Label>
                      <Input
                        value={item.name}
                        onChange={(e) => onChange({ ...item, name: e.target.value })}
                        placeholder="Parent name"
                      />
                    </div>
                    <div>
                      <Label className="text-xs text-muted-foreground">Testimonial</Label>
                      <Input
                        value={item.text}
                        onChange={(e) => onChange({ ...item, text: e.target.value })}
                        placeholder="Their review..."
                      />
                    </div>
                  </div>
                )}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

// ==================== FORMS & OFFERS ====================
export function FormsEditor() {
  const { draftContent, updateDraft } = useAdminStore();
  const scheduleForm = (draftContent as any).scheduleForm || {};
  const countdownOffer = (draftContent as any).countdownOffer || {};
  const bottomBar = (draftContent as any).bottomBar || {};

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Forms & Offers</h1>
        <p className="text-muted-foreground">Configure form content and special offers</p>
      </div>

      <Tabs defaultValue="schedule" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="schedule">Schedule Form</TabsTrigger>
          <TabsTrigger value="countdown">Countdown Offer</TabsTrigger>
          <TabsTrigger value="bottombar">Bottom Bar</TabsTrigger>
        </TabsList>

        <TabsContent value="schedule" className="space-y-4 mt-4">
          <Card>
            <CardHeader><CardTitle>Schedule Form Content</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <TextField 
                label="Title" 
                value={scheduleForm.title || ''} 
                onChange={(v) => updateDraft('scheduleForm.title', v)} 
              />
              <TextAreaField 
                label="Description" 
                value={scheduleForm.description || ''} 
                onChange={(v) => updateDraft('scheduleForm.description', v)} 
              />
              <TextField 
                label="Button Text" 
                value={scheduleForm.buttonText || ''} 
                onChange={(v) => updateDraft('scheduleForm.buttonText', v)} 
              />
              <TextField 
                label="Consent Text" 
                value={scheduleForm.consentText || ''} 
                onChange={(v) => updateDraft('scheduleForm.consentText', v)} 
              />
              <TextField 
                label="Success Message" 
                value={scheduleForm.successMessage || ''} 
                onChange={(v) => updateDraft('scheduleForm.successMessage', v)} 
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="countdown" className="space-y-4 mt-4">
          <Card>
            <CardHeader><CardTitle>Countdown Offer Content</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <TextField 
                label="Badge Text" 
                value={countdownOffer.badge || ''} 
                onChange={(v) => updateDraft('countdownOffer.badge', v)} 
              />
              <TextField 
                label="Pretitle" 
                value={countdownOffer.pretitle || ''} 
                onChange={(v) => updateDraft('countdownOffer.pretitle', v)} 
              />
              <TextField 
                label="Title" 
                value={countdownOffer.title || ''} 
                onChange={(v) => updateDraft('countdownOffer.title', v)} 
              />
              <TextAreaField 
                label="Description" 
                value={countdownOffer.description || ''} 
                onChange={(v) => updateDraft('countdownOffer.description', v)} 
              />
              <TextField 
                label="Countdown Minutes" 
                value={String(countdownOffer.countdownMinutes || 15)} 
                onChange={(v) => updateDraft('countdownOffer.countdownMinutes', parseInt(v) || 15)} 
              />
              <TextField 
                label="Button Text" 
                value={countdownOffer.buttonText || ''} 
                onChange={(v) => updateDraft('countdownOffer.buttonText', v)} 
              />
              <TextField 
                label="Success Message" 
                value={countdownOffer.successMessage || ''} 
                onChange={(v) => updateDraft('countdownOffer.successMessage', v)} 
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="bottombar" className="space-y-4 mt-4">
          <Card>
            <CardHeader><CardTitle>Bottom Bar Content</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <TextField 
                label="Message" 
                value={bottomBar.message || ''} 
                onChange={(v) => updateDraft('bottomBar.message', v)} 
              />
              <TextField 
                label="Button Text" 
                value={bottomBar.buttonText || ''} 
                onChange={(v) => updateDraft('bottomBar.buttonText', v)} 
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

// Re-export from separate files
export { ProgramsEditor } from './ProgramsEditor';
export { ReviewsEditor } from './ReviewsEditor';
export { BlogEditor } from './BlogEditor';
export { AssetLibraryEditor } from './AssetLibraryEditor';